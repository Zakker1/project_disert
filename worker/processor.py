from PIL import Image
import numpy as np

def process_image(path):
    image = Image.open(path).convert("L")
    arr = np.array(image)
    return round(float(np.mean(arr)), 2)