cd seafront_full/twolevels/level3/vids
for /f "delims=" %%f in ('dir /b /a-d-h-s') do (
ffmpeg -i %%f -vf fps=1 ../pics/%%~nf_%%d.jpg
)
pause