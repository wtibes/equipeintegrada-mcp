from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[1]
mark = Image.open(root / "assets" / "logo-mark.png").convert("RGBA")
size = 512
# White square tile. Cursor rounds the corners.
canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
fitted = mark.copy()
fitted.thumbnail((size - 64, size - 64), Image.Resampling.LANCZOS)
x = (size - fitted.width) // 2
y = (size - fitted.height) // 2
canvas.paste(fitted, (x, y), fitted)
canvas.convert("RGB").save(root / "assets" / "logo.png", "PNG")
print("Wrote assets/logo.png")
