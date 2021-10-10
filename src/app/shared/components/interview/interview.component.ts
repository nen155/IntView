import { UsersService } from 'src/app/core/services/users.service';
import { Comment } from 'src/app/core/interfaces/comment';
import { AnswersService } from './../../../core/services/answers.service';
import { User } from 'src/app/core/interfaces/user';
import { Component, OnInit } from '@angular/core';
import * as momentImported from "moment";
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/core/interfaces/answer';
const moment = momentImported;

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.sass']
})
export class InterviewComponent implements OnInit {

  playList;
  user: User;
  idCandidate: number;
  idInterview: number;
  answers: Array<Answer>;
  comments: Comment[];

  constructor(private route: ActivatedRoute, private answersService: AnswersService, private userService: UsersService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params && params.idCandidate) {
        this.idCandidate = params.idCandidate;
        this.idInterview = params.idInterview;

      }
    });

    this.playList =  [{
      name: 'Disney\'s Oceans',
      duration: 45,
      sources: [
        { src: '//vjs.zencdn.net/v/oceans.mp4', type: 'video/mp4' },
      ],
      thumbnail: [
        {
          srcset: '//vjs.zencdn.net/v/oceans.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//vjs.zencdn.net/v/oceans.png'
        }
      ],
    }, {
      name: 'Sintel',
      description: 'The film follows a girl named Sintel who is searching for a baby dragon she calls Scales.',
      id: 'sintel',
      sources: [
        { src: '//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8', type: 'application/x-mpegurl' },
        { src: '//d2zihajmogu5jn.cloudfront.net/sintel/sintel.mp4', type: 'video/mp4' },
      ],
      duration: 888,
      poster: '//d2zihajmogu5jn.cloudfront.net/sintel/poster.png',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/sintel/poster.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/sintel/poster.png'
        }
      ],
    }, {
      name: 'Advanced Bip Bop',
      description: "Apple's test HLS stream",
      id: 'bipbop-advanced',
      sources: [
        {
          src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
          type: 'application/x-mpegurl'
        }
      ],
      poster: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/poster.png',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/poster.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/poster.png'
        }
      ],
      duration: 1800,
    }, {
      name: "Elephant's Dream (HLS with captions, audio description and chapters)",
      description: 'The film features two men, Proog, who is older and more experienced, and Emo, who is young and nervous, living in a miraculous construction referred to only as "The Machine".',
      id: 'elephantsdream',
      sources: [
        { src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8', type: 'application/x-mpegurl' },
      ],
      duration: 653,
      textTracks: [
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/chapters.en.vtt',
          kind: 'chapters',
          srclang: 'en',
          label: 'English'
        }
      ],
      poster: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png'
        }
      ],
    }, {
      name: "Elephant's Dream (mp4 with separate text track audio description, captions, and chapters)",
      description: 'The film features two men, Proog, who is older and more experienced, and Emo, who is young and nervous, living in a miraculous construction referred to only as "The Machine".',
      id: 'elephantsdreammp4',
      sources: [
        { src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4', type: 'video/mp4' },
        { src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.ogg', type: 'video/ogg' }
      ],
      duration: 653,
      textTracks: [
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.en.vtt',
          kind: 'captions',
          srclang: 'en',
          label: 'English'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.ar.vtt',
          kind: 'captions',
          srclang: 'ar',
          label: 'Arabic'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.sv.vtt',
          kind: 'captions',
          srclang: 'sv',
          label: 'Swedish'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.ru.vtt',
          kind: 'captions',
          srclang: 'ru',
          label: 'Russian'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/captions.ja.vtt',
          kind: 'captions',
          srclang: 'ja',
          label: 'Japanese'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/descriptions.en.vtt',
          kind: 'descriptions',
          srclang: 'en',
          label: 'English'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/chapters.en.vtt',
          kind: 'chapters',
          srclang: 'en',
          label: 'English'
        },
      ],
      poster: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png'
        },
      ],
    }, {
      name: 'Tears of Steel',
      id: 'tears-of-steel',
      sources: [
        { src: '//d2zihajmogu5jn.cloudfront.net/tears-of-steel/playlist.m3u8', type: 'application/x-mpegurl' },
        { src: '//d2zihajmogu5jn.cloudfront.net/tears-of-steel/tears_of_steel_720p.mp4', type: 'video/mp4' }
      ],
      duration: 733,
      poster: '//d2zihajmogu5jn.cloudfront.net/tears-of-steel/tears_of_steel.jpg',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/tears-of-steel/tears_of_steel.jpg',
          type: 'image/jpeg',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/tears-of-steel/tears_of_steel.jpg'
        },
      ],
    }, {
      name: 'Big Buck Bunny',
      description: 'The plot follows a day of the life of Big Buck Bunny when he meets three bullying rodents, Frank (the leader of the rodents), Rinky and Gimera.',
      id: 'big-buck-bunny',
      sources: [
        { src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/master.m3u8', type: 'application/x-mpegurl' },
        { src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.mp4', type: 'video/mp4' },
      ],
      duration: 596,
      poster: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.png',
      thumbnail: [
        {
          srcset: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.png',
          type: 'image/png',
          media: '(min-width: 400px;)'
        },
        {
          src: '//d2zihajmogu5jn.cloudfront.net/big-buck-bunny/bbb.png'
        },
      ]
    }];

    this.userService.getUser()
    .subscribe(user=>{
      this.user = user;
    });
    this.comments = [];
  }

  changeComments(index){
    if(this.answers)
      this.comments = this.answers[index].comments;
  }

  addComment(comment){
    comment.created_at = moment(comment.created_at,'YYYY-MM-DD HH:mm:ss')
    .add(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).utcOffset(),'minute')
    .format('DD/MM/YYYY HH:mm:ss');
    comment.user = this.user;
    this.comments.push(comment);
  }

  getAnswers(idCandidate: number, idInterview: number){
    this.answersService.getByIdCandidateAndIdInterview(idCandidate, idInterview)
    .subscribe((answers) => {
      this.answers = answers.slice();
      this.playList = this.answers.map(answer => {
        return { name: answer.question.title,
          duration: answer.duration,
          sources: [ { src: answer.video_answer, type: 'video/webm' } ],
          thumbnail: [ { src: answer.thumbnail_video_answer }]
          };
        }
        );
      this.comments = this.answers[0].comments.slice();
    });
  }
}
