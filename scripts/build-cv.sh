#!/usr/bin/env bash
# Compila cv/cv*.tex con pdflatex (TeX Live en Docker) → public/cv/breyner-ciro-cv-{es,en,pt}.pdf
# Lo corre el deploy (GitHub Actions) y, en local, `npm run build:cv`.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/cv
docker run --rm -u "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD":/w -w /w/cv ghcr.io/xu-cheng/texlive-full:latest sh -c '
  set -e
  for pair in cv:es cv.en:en cv.pt:pt; do
    src=${pair%%:*}; lang=${pair##*:}
    pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp "$src.tex" >/tmp/$lang.log || { tail -30 /tmp/$lang.log; exit 1; }
    cp "/tmp/$src.pdf" "../public/cv/breyner-ciro-cv-$lang.pdf"
  done'
ls -l public/cv
