from django import forms
class UserForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'class' : 'input-field', "placeholder":"Enter your username"}))
    email = forms.CharField(widget=forms.TextInput(attrs={'class': 'input-field', "placeholder": "Enter your email"}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class' : 'input-field', "placeholder":"Enter your password"}))

