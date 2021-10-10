import { State } from './../../core/interfaces/state';
import { Question } from './../../core/interfaces/question';
import { TranslateService } from '@ngx-translate/core';
import { FilterScoreComponent } from './../../shared/components/filter-score/filter-score.component';
import { Candidate } from './../../core/interfaces/candidate';
import { ActivatedRoute } from '@angular/router';
import { CandidatesService } from './../../core/services/candidates.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CandidacysService } from 'src/app/core/services/candidacys.service';
//import { MatFabMenu } from '@angular-material-extensions/fab-menu';

@Component({
  selector: 'app-interview-progress',
  templateUrl: './interview-progress.component.html',
  styleUrls: ['./interview-progress.component.sass']
})
export class InterviewProgressComponent implements OnInit {

  candidates = new Array<Candidate>();
  unFilteredCandidates = new Array<Candidate>();
  rejectCandidates = new Array<Candidate>();
  unFilteredRejectCandidates = new Array<Candidate>();
  passCandidates = new Array<Candidate>();
  unFilteredPassCandidates = new Array<Candidate>();
  hireCandidates = new Array<Candidate>();
  unFilteredHireCandidates = new Array<Candidate>();
  showSpinner = false;
  filterScore = 0;
  filterStates = [];
  filterQuestions = [];
  idInterview = -1;
  filtersAppliedToState = [];
  statesList = [];
  /*fabButtonsMenu: MatFabMenu[] = [
    {
      id: 1,
      icon: 'filter_list'
    },
    {
      id: 2,
      icon: 'share'
    },
    {
      id: 3,
      icon: 'edit'
    },
    {
      id: 4,
      icon: 'lock',
      tooltip: 'Hola',
      tooltipPosition: 'left'
    },
  ];*/

  constructor(private candidacysService: CandidacysService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private translate: TranslateService) {

  }

  async ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (params && params.id) {
          this.idInterview = params.id;
          this.getCandidates(this.idInterview);
        }
      });
      this.statesList = await this.translate.get('interview.states').toPromise();
  }


  //#region Get Data
  async getCandidates(id) {
    const candidatos = await this.candidacysService.getCandidacysByIdInterview(id,0);
    candidatos.subscribe((candidatesByState) => {
      this.candidates = this.candidates.concat(candidatesByState['candidate']);
      this.rejectCandidates = this.rejectCandidates.concat(candidatesByState['rejected']);
      this.passCandidates = this.passCandidates.concat(candidatesByState['passed']);
      this.hireCandidates = this.hireCandidates.concat(candidatesByState['hired']);
      this.unFilteredCandidates = this.unFilteredCandidates.concat(this.candidates);
      this.unFilteredHireCandidates = this.unFilteredHireCandidates.concat(this.hireCandidates);
      this.unFilteredPassCandidates = this.unFilteredPassCandidates.concat(this.passCandidates);
      this.unFilteredRejectCandidates = this.unFilteredRejectCandidates.concat(this.rejectCandidates);
    });
  }
  //#endregion

  //#region Save Data
  saveStatesInCandidacy(candidacy_id:number,hire_state:string){
    this.candidacysService.updateState(candidacy_id, hire_state)
    .subscribe(resultado=>{
      console.log(resultado);
    });
  }
  //#endregion

  //#region Events
  onClickFilterScore(scoreQuestion){
    const dialogRef = this.dialog.open(FilterScoreComponent, {
      width: '450px',
      data: {scoreQuestion, idInterview: this.idInterview, states: this.filterStates, score: this.filterScore, questions: this.filterQuestions }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.filterStates = result.statesAnswer;
        this.filterScore = result.score;
        this.filterQuestions = result.questionsAnswer;
        if (!scoreQuestion) {
          this.onFilterScore(this.filterScore, this.filterStates);
        } else {
          this.onFilterScoreQuestion(this.filterQuestions, this.filterScore, this.filterStates);
        }
      }
    });
  }

  onClickClearFilters(){
    this.filtersAppliedToState = [];
    this.clearFilters(this.statesList.map((filter) => filter.value));
  }

  onClickClearFilter(filter){
    this.filtersAppliedToState = this.filtersAppliedToState.filter((fil) => fil.name != filter.name);
    this.clearFilters([filter]);
  }

  drop(event: CdkDragDrop<Candidate[]>) {
    const {containerUnFiltered, containerPreviousUnFiltered} = this.getUnFilteredLists(event.container, event.previousContainer);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(containerUnFiltered.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      transferArrayItem(containerPreviousUnFiltered.data,
                          containerUnFiltered.data,
                          event.previousIndex,
                          event.currentIndex);
      this.changeHireStateCandidateFromIndex(containerUnFiltered.data[event.currentIndex], containerUnFiltered.state);
    }

  }
  async changeHireStateCandidateFromIndex(unFilteredCandidates, state){
    unFilteredCandidates.hire_state = state;
    this.saveStatesInCandidacy(unFilteredCandidates.candidacy_id, state);
  }
  getUnFilteredLists(container, previousContainer){
    const containerUnFiltered = this.searchContainer(container.id);
    const containerPreviousUnFiltered = this.searchContainer(previousContainer.id);
    return {containerUnFiltered, containerPreviousUnFiltered};
  }
  searchContainer(id){
    switch(id){
      case 'cdk-drop-list-0':
        return { data: this.unFilteredCandidates, state: 'candidate'};
      case 'cdk-drop-list-1':
        return {data:this.unFilteredRejectCandidates, state: 'rejected'};
      case 'cdk-drop-list-2':
        return {data:this.unFilteredPassCandidates , state: 'passed'};
      case 'cdk-drop-list-3':
        return  {data:this.unFilteredHireCandidates, state: 'hired'};
    }
  }
  //#endregion

  //#region Filters
  onFilterScore(score: number, states: Array<State>) {
    states.forEach((state) => {
      switch (state.value) {
        case 'candidate':
          this.candidates = this.applyFilterScore(this.candidates, score, state);
          break;
        case 'reject':
          this.rejectCandidates = this.applyFilterScore(this.rejectCandidates, score, state);
          break;
        case 'pass':
          this.passCandidates =  this.applyFilterScore(this.passCandidates, score, state);
          break;
        case 'hired':
          this.hireCandidates = this.applyFilterScore(this.hireCandidates, score, state);
          break;
      }
    });
  }

  onFilterScoreQuestion(questions: Array<Question>, score: number, states: Array<State>) {
    states.forEach((state) => {
      switch (state.value) {
        case 'candidate':
          this.candidates = this.applyFilterScoreQuestion(this.candidates, questions, score, state);
          break;
        case 'reject':
          this.rejectCandidates = this.applyFilterScoreQuestion(this.rejectCandidates, questions, score, state);
          break;
        case 'pass':
          this.passCandidates = this.applyFilterScoreQuestion(this.passCandidates, questions, score, state);
          break;
        case 'hired':
          this.hireCandidates = this.applyFilterScoreQuestion(this.hireCandidates, questions, score, state);
          break;
      }
    });
  }

  applyFilterScore(data, score: number, state: State) {
    this.filtersAppliedToState.push({value: state.value, name: 'Fase: ' + state.name + ' - Puntuación: ' + score});
    return data.filter((candidate) => candidate.score >= score);
  }

  applyFilterScoreQuestion(data, questions: Array<Question>, score: number, state: State) {
    questions.forEach(element => {
      this.filtersAppliedToState.push({value: state.value, name: 'Fase: ' + state.name + ' - Pregunta: ' + element.title.substring(0,30) + '... - Puntuación: ' + score});
    });
    return data.filter((candidate)=>{ candidate.answers.filter((answer) => questions.map((question) =>question.id).includes(answer.question.id) && answer.score >= score )});
  }

  clearFilters(states: Array<State>){
    states.forEach((state) => {
      switch (state.value) {
        case 'candidate':
          this.candidates = [];
          this.candidates = this.candidates.concat(this.unFilteredCandidates);
          break;
        case 'reject':
          this.rejectCandidates = [];
          this.rejectCandidates = this.rejectCandidates.concat(this.unFilteredRejectCandidates);
          break;
        case 'pass':
          this.passCandidates = [];
          this.passCandidates = this.passCandidates.concat(this.unFilteredPassCandidates);
          break;
        case 'hired':
          this.hireCandidates = [];
          this.hireCandidates = this.hireCandidates.concat(this.unFilteredHireCandidates);
          break;
      }
    });
  }

   /*
  Filtros premium que hay que estudiarlos para ver de donde sacar la información de habilidades del candidato y experiencia
  Puede ser de varias formas:
  1- Del curriculum con el OCR que rellene completamente el perfil del usuario esto puede servir para el prefiltrado cuando se quiera inscribir un usuario
  2- De la propia entrevista de lo que conteste en las respuestas que se vaya guardando y se compare después
  3- De un cuestionario premium que puede enviar la empresa donde se le piden las habilidades y la experiencia en el campo
  onFilterSkills(){

  }

  onFilterExperience(){

  }
  */
  //#endregion



}
