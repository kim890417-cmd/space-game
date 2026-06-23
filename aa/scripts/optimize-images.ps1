<#
Simple PowerShell image optimization helper.
Requires `cwebp` (from libwebp) in PATH to convert PNG/JPG to WebP.
If images are already WebP, it will attempt to recompress them.

Usage: .\optimize-images.ps1 -InputDir .\img -Quality 80
#>

param(
    [string]$InputDir = "img",
    [int]$Quality = 80
)

if (-not (Test-Path $InputDir)) {
    Write-Host "Input directory '$InputDir' not found." -ForegroundColor Yellow
    exit 1
}

$cwebp = Get-Command cwebp -ErrorAction SilentlyContinue
if (-not $cwebp) {
    Write-Host "cwebp not found in PATH. Install libwebp or use another tool." -ForegroundColor Yellow
    exit 1
}

Get-ChildItem -Path $InputDir -Include *.png,*.jpg,*.jpeg,*.webp -File | ForEach-Object {
    $in = $_.FullName
    $out = Join-Path $_.DirectoryName ([IO.Path]::GetFileNameWithoutExtension($_.Name) + ".webp")
    Write-Host "Converting $($_.Name) -> $(Split-Path $out -Leaf) (q=$Quality)"
    & $cwebp -q $Quality "$in" -o "$out"
}

Write-Host "Done. Review files in $InputDir." -ForegroundColor Green
