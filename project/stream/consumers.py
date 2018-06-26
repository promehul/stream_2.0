from channels.generic.websocket import AsyncWebsocketConsumer
import json

class StreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "stream",
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "stream",
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url = text_data_json['url']
        volume = text_data_json['volume']
        mute = text_data_json['mute']
        seek = text_data_json['seek'] 
        duration = text_data_json['duration']
        play = text_data_json['play']
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            "stream",
            {
                'type': 'stream_music',
                'url': url,
                'volume': volume,
                'duration': duration,
                'seek': seek,
                'play': play,
                'mute': mute,
                'message': message

            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        url = event['url']
        volume = event['volume']
        mute = event['mute']
        seek = event['seek']
        duration = event['duration']
        play =  event['play']
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
                'url': url,
                'volume': volume,
                'duration': duration,
                'seek': seek,
                'play': play,
                'mute': mute,
                'message': message
        }))
