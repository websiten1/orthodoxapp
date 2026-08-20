from PIL import Image, ImageDraw

BLACK = (0, 0, 0, 255)
GOLD = (201, 162, 39, 255)


def draw_cross(draw, cx, cy, arm_len, arm_w):
    draw.rounded_rectangle(
        [cx - arm_w / 2, cy - arm_len / 2, cx + arm_w / 2, cy + arm_len / 2],
        radius=arm_w * 0.28,
        fill=GOLD,
    )
    draw.rounded_rectangle(
        [cx - arm_len * 0.42, cy - arm_w / 2, cx + arm_len * 0.42, cy + arm_w / 2],
        radius=arm_w * 0.28,
        fill=GOLD,
    )


def make_icon(size, corner_radius_ratio, cross_ratio, path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=size * corner_radius_ratio, fill=BLACK)
    draw_cross(draw, size / 2, size / 2, size * cross_ratio, size * cross_ratio * 0.22)
    img.save(path)


make_icon(192, 0.22, 0.46, "public/icon-192.png")
make_icon(512, 0.22, 0.46, "public/icon-512.png")
# Maskable: keep the glyph inside the safe zone (icon content within center 80%)
make_icon(512, 0.0, 0.34, "public/icon-512-maskable.png")

print("done")
