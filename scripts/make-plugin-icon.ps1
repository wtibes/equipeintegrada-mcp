Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'assets\logo-mark.png'
$dstPath = Join-Path $root 'assets\logo.png'

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$size = 512
$bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# Square tile like Stripe/Cloudflare; slightly darker than the mark so "eq." stays black.
$g.Clear([System.Drawing.Color]::FromArgb(255, 56, 176, 228))

$pad = 28
$avail = $size - (2 * $pad)
$scale = [Math]::Min($avail / $src.Width, $avail / $src.Height)
$w = [int]($src.Width * $scale)
$h = [int]($src.Height * $scale)
$x = [int](($size - $w) / 2)
$y = [int](($size - $h) / 2)
$g.DrawImage($src, $x, $y, $w, $h)
$src.Dispose()
$g.Dispose()

$tmp = Join-Path $root 'assets\logo.tmp.png'
$bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Move-Item -LiteralPath $tmp -Destination $dstPath -Force
Write-Output "Wrote $dstPath"
