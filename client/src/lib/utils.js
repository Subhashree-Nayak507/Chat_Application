import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const colors = [
  { bg: "bg-sky-800", text: "text-white", border: "border-sky-700" },
  { bg: "bg-gray-800", text: "text-gray-100", border: "border-gray-600" },
  { bg: "bg-pink-500", text: "text-white", border: "border-pink-700" },
  { bg: "bg-green-600", text: "text-white", border: "border-green-800" },
  { bg: "bg-red-600", text: "text-white", border: "border-red-800" }
];

export const getColor = (color) => {
  // Ensure `color` is a valid index within the bounds of the `colors` array
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  // Default to the first color if the index is invalid
  return colors[0];
};

export const animationDefaultLoops ={
  loops:true,
  autoplay:true,

}