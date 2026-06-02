from django.contrib import admin
from .models import Question
from .models import MCQ
from .models import Written
from .models import Connect
from .models import AudioVisual
from .models import Facts
from .models import Archive

admin.site.register(Question)
admin.site.register(MCQ)
admin.site.register(Written)
admin.site.register(Connect)
admin.site.register(AudioVisual)
admin.site.register(Facts)
admin.site.register(Archive)
