from django.conf.urls import url
from bankone.dashboard import views

urlpatterns = [
    url(r'^$', views.dashboard),
]