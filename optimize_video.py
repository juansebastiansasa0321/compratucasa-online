from moviepy import VideoFileClip
import os

input_file = "public/videocasa1.mp4"
output_file = "public/videocasa1_optimized.mp4"

print(f"Propiedades del video original...")
try:
    with VideoFileClip(input_file) as clip:
        print(f"Duración: {clip.duration}s")
        print(f"Resolución: {clip.w}x{clip.h}")
        
        # Recortar a 8 segundos
        new_clip = clip.subclipped(0, 8)
        
        # Sin audio
        new_clip = new_clip.without_audio()
        
        # Redimensionar si es muy grande (ej. mayor a 720p de alto)
        if new_clip.h > 720:
            print("Redimensionando a 720p...")
            new_clip = new_clip.resized(height=720)
            
        print(f"Escribiendo archivo optimizado en {output_file}...")
        # Bitrate controlado para web
        new_clip.write_videofile(
            output_file, 
            codec="libx264", 
            audio=False, 
            preset="medium", 
            ffmpeg_params=["-crf", "26"] # CRF 26 es bastante comprimido pero buena calidad para fondo
        )
        print("Optimización completada correctamente.")
        
except Exception as e:
    print(f"Error optimizando video: {e}")
