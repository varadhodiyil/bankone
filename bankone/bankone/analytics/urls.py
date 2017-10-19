from django.conf.urls import url
from bankone.analytics import views
urlpatterns = [
    url(r'^$', views.AnalyticsAPI.as_view()),
]