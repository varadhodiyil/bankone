# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
import json
import os

JSON_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),"anyl_main")

# Create your views here.
class AnalyticsAPI(GenericAPIView):

    def get(self,request,*args,**kwargs):
        data = dict()
        try:
            data_file = os.path.join(JSON_FILE_PATH,"data.json")
            with open(data_file) as h:
                data = json.load(h)
        except IOError:
            pass
        return Response(data)
