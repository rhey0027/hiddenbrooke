export interface CarouselWindowResponsiveProps {
  images?: string[];
  size?: "small" | "medium" | "large";
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  image_url: string;
  created_at: string;
}
