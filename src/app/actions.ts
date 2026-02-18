"use server";
import { supabase } from "@/utils/supebase";
import { revalidatePath } from "next/cache";

export async function submitTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const brief = formData.get("brief") as string;
  const file = formData.get("image") as File;

  // Upload to Storage
  const fileName = `${Date.now()}-${file.name}`;
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from("testimonials-images")
    .upload(fileName, file);

  if (uploadErr) throw uploadErr;

  // Get Public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("testimonials-images").getPublicUrl(fileName);

  // Insert Record
  await supabase
    .from("testimonials-images")
    .insert([{ name, brief, image_url: publicUrl }]);

  revalidatePath("/"); // Refresh UI
}
