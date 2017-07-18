cd seafront_full/twolevels/level3/old
for /f "delims=" %%f in ('dir /b /a-d-h-s') do (
for /l %%x in (0, 1, 8) do (
ffmpeg -ss 0 -i %%f -frames:v %%x pics/%%~nf_%%x.jpg
)
)