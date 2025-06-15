import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import Echo from 'laravel-echo';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class EchoService {
    public echo!: Echo<any>;
    public echoReady!: Promise<void>;
    private echoResolve!: () => void;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        if (isPlatformBrowser(platformId)) {
            this.echoReady = new Promise(resolve => this.echoResolve = resolve);

            import('pusher-js').then(({ default: Pusher }) => {
                (window as any).Pusher = Pusher;

                this.echo = new Echo({
                    broadcaster: 'pusher',
                    key: 'rgmeoaoihmylwj9gocmk',
                    cluster: '',
                    wsHost: '127.0.0.1',
                    wsPort: 8080,
                    forceTLS: false,
                    disableStats: true,
                    enabledTransports: ['ws'],
                });

                this.echoResolve(); // ✅ Echo is ready
            });
        }
    }

    async listenToChatChannel(roomId: string, callback: (data: any) => void) {
        await this.echoReady; // ✅ Wait for Echo to be ready

        const channelName = `chat.room.${roomId}`;
        this.echo.channel(channelName)
            .listen('.message.sent', (data: any) => {
                callback(data);
            });
    }
    async listenToTyping(roomId: string, callback: (data: any) => void) {
        console.log(roomId)
        await this.echoReady;
        this.echo.channel(`chat.room.${roomId}`)
            .listen('.user.typing', (data: any) => {
                console.log("asdfa", data)
                callback(data);
            });
    }

}
