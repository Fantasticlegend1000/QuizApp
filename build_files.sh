#!/bin/bash
set -euo pipefail

pip install -r requirements.txt

cd quiz_app
python manage.py collectstatic --noinput --clear

cd ..
mkdir -p staticfiles_build
cp -r quiz_app/staticfiles staticfiles_build/static
