import { EventEmitter } from '@angular/core';
// vjs-player.component.ts
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import videojs from 'video.js';
import 'videojs-titleoverlay';
import 'videojs-overlay';
import 'videojs-playlist';
import 'videojs-playlist-ui';

@Component({
  selector: 'app-videoplayer',
  template: `
    <section class="main-preview-player">
      <video #target id="preview-player" class="video-js vjs-big-play-centered" controls preload="auto" crossorigin="anonymous">
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
      </video>

      <div class="playlist-container  preview-player-dimensions">
        <ol class="vjs-playlist"></ol>
      </div>
  </section>
  `,

  styleUrls: ['./videoplayer.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoplayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      sources: {
          src: string,
          type: string,
      }[]
  };

  @Input() playList;

  player: videojs.Player;
  @Output() currentAnswer =  new EventEmitter<number>();


  constructor(
    private elementRef: ElementRef,
  ) {

   }

  ngOnInit() {
    let options = {
      title: 'My Video Title',  //Title for movie
      floatPosition: 'right', //Float left or right (to prevent big play button overlap) (default left)
      margin: '10px', //Margin from top/left/right (default 10px)
      fontSize: '1.5em', //font size (default 1em)
      debug: false //true or false. Will output debug messages for title statu
    };


    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });

    options.title = this.playList[0].name;
    this.player.titleoverlay(options);

    if ( this.playList.length > 0){
      this.player.playlist(this.playList);
      this.player.on('playlistitem',
      (event, item) => {
        this.player.titleoverlay.updateTitle(item.name);
        this.currentAnswer.emit(item.playlistItemId_ - 1);
      }
      );
      this.player.playlistUi();
    }
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
