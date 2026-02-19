"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import {
  Quote,
  Star,
  X,
  Loader2,
  MessageSquarePlus,
  Shield,
  LogOut,
  Trash2,
} from "lucide-react";
import { compressImage } from "@/utils/compress-image";

// ─── Supabase Client ─────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: string;
  name: string;
  comment: string;
  image_url: string | null;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getAvatarUrl = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1a6b4a,2d8f6f,4aaE8a&fontFamily=Georgia&fontSize=38`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// ─── TestimonialCard ──────────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  isAdmin,
  onDelete,
}: {
  testimonial: Testimonial;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}) {
  const avatarSrc = testimonial.image_url || getAvatarUrl(testimonial.name);

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-md border border-stone-100 hover:shadow-sm transition-shadow duration-300 flex flex-col gap-4">
      {/* Quote icon */}

      {isAdmin && (
        <Quote className="w-5 h-5 text-emerald-200 absolute top-5 right-5" />
      )}
      {/* Admin delete button */}

      {isAdmin && (
        <button
          onClick={() => onDelete(testimonial.id)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Delete review"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Comment */}
      <p className="text-stone-600 text-sm leading-relaxed flex-1">
        {testimonial.comment}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-100">
          <Image
            src={avatarSrc}
            alt={testimonial.name}
            fill
            className="object-cover"
            unoptimized // needed for external URLs like dicebear
          />
        </div>
        <div>
          <p className="font-semibold text-stone-800 text-sm">
            {testimonial.name}
          </p>
          <p className="text-stone-400 text-xs">
            {formatDate(testimonial.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Add Testimonial Modal ────────────────────────────────────────────────────
function AddTestimonialModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (t: Testimonial) => void;
}) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Compress before uploading
    const compressed = await compressImage(file, {
      maxWidthOrHeight: 200,
      quality: 0.8, //80% quality for JPEG
    });

    setImageFile(compressed);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `avatars/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("testimonial-images") // your bucket name
      .upload(path, file, { upsert: false });
    if (error) return null;
    const { data } = supabase.storage
      .from("testimonial-images")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setLoading(true);
    setError(null);

    try {
      let image_url: string | null = null;

      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const { data, error: insertError } = await supabase
        .from("testimonials")
        .insert({ name: name.trim(), comment: comment.trim(), image_url })
        .select()
        .single();

      if (insertError) throw insertError;
      onSuccess(data as Testimonial);
      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <h2 className="text-xl font-bold text-stone-800 mb-1 capitalize">
          {/* Share Your Experience */}
          Comparti el di uste experiencia
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          {/* We&quot;d love to hear about your stay at Hiddenbrooke. */}
          Quiere kame ohi el di uste experiencia de uste stay na hiddenbrooke
          resort.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar preview + upload */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-emerald-100 shrink-0 relative bg-stone-100">
              <Image
                src={imagePreview || getAvatarUrl(name || "Guest")}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <label className="cursor-pointer text-sm text-emerald-700 hover:text-emerald-900 font-medium underline underline-offset-2">
              Upload photo (optional)
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-stone-700 text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rheanna Jane"
              required
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-stone-700 text-sm font-medium">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Pabor man share di uste experiencia..."
              required
              rows={4}
              maxLength={400}
              className="border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
            />
            <p className="text-stone-400 text-xs text-right">
              {comment.length}/400
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl py-3 text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer "
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Envia mi review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Admin modal
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "hiddenbrooKe-admiN";

function AdminLoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
      onClose();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-red-600 transition-colors"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center ">
            <Shield className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-800">Admin Access</h2>
            <p className="text-stone-400 text-xs">
              Enter password to manage reviews
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Authorization Code"
            autoFocus
            className={`border rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 transition ${
              error
                ? "border-red-300 focus:ring-red-300"
                : "border-stone-200 focus:ring-emerald-400"
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs -mt-2">
              Authorization Code Required!.
            </p>
          )}
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors cursor-pointer"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmDeleteModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <h2 className="text-lg font-bold text-stone-800 mb-2">
          Delete Review?
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          This action cannot be undone. The review will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border border-stone-200 text-stone-600 hover:bg-stone-50 font-medium rounded-xl py-2.5 text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setTestimonials((data as Testimonial[]) || []);
    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchTestimonials();
    }, 1000); // simulate loading delay
  }, []);

  const handleNewTestimonial = (t: Testimonial) => {
    setTestimonials((prev) => [t, ...prev]);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", deleteTarget);
    if (!error) {
      await fetchTestimonials(); // refresh list after deletion
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  return (
    <section className="min-h-screen bg-green-50 py-10 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <p className="text-emerald-700 font-bold tracking-widest text-5xl mb-3 text-shadow-sm font-[Style_Script]">
          Guest Reviews
        </p>
        <h1 className="text-lg font-bold text-stone-800 mb-4">
          What Our Guests Say
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed mb-8">
          Real experiences from guests who&quot;ve stayed at Hiddenbrooke
          Resort.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </button>

        {/* Admin toggle */}

        {isAdmin ? (
          <button
            onClick={() => setIsAdmin(false)}
            className="inline-flex items-center gap-2 border border-stone-200 text-stone-500 hover:text-red-500 hover:bg-stone-100 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer"
            title="Exit Admin Mode"
          >
            <LogOut className="w-4 h-4" />
            Exit Admin
          </button>
        ) : (
          <button
            onClick={() => setShowAdminLogin(true)}
            className="inline-flex items-center gap-2 border border-green-700 text-stone-400 hover:text-stone-600 hover:bg-stone-100 px-4 py-3 rounded-xl text-sm transition-colors ml-2"
            title="Admin login"
          >
            <Shield className="w-4 h-4 cursor-pointer hover:text-red-500 duration-150 transition-all" />
          </button>
        )}
      </div>

      {isAdmin && (
        <p className="mt-4 text-xs text-emerald-700 font-medium">
          Admin mode active — click the trash icon on any card to delete it.
        </p>
      )}

      {/* Cards Grid — scrollable container */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center text-stone-400 py-20">
          <p className="text-lg">No reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {/* Scrollable card grid: shows ~5-6 cards, scrolls vertically */}

          <div className="relative">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-h-380px overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent"
              style={{ maxHeight: "680px" }}
            >
              {testimonials.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  isAdmin={isAdmin}
                  onDelete={() => setDeleteTarget(t.id)}
                />
              ))}
            </div>
            {/* fade gradient at bottom to hint more to scroll */}
            {testimonials.length > 6 && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-white to-transparent" />
            )}
          </div>

          <p className="text-center text-stone-400 text-xs mt-6">
            {testimonials.length} review{testimonials.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddTestimonialModal
          onClose={() => setShowModal(false)}
          onSuccess={handleNewTestimonial}
        />
      )}
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={() => setIsAdmin(true)}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </section>
  );
}
