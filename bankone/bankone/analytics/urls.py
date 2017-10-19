from django.conf.urls import url
from bankone.analytics import views
from rest_framework_swagger.views import get_swagger_view
schema_view = get_swagger_view(title="Bankone Product Analytics API's")
urlpatterns = [
    url(r'^$',schema_view),
    url(r'^data/$', views.AnalyticsAPI.as_view()),
]