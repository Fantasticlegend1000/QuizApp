"""
WSGI config for quiz_app project.

Exposes the WSGI callable as ``application`` and ``app`` (for Vercel).
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quiz_app.settings')

application = get_wsgi_application()

app = application
