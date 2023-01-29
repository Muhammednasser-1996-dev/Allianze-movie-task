import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Movie } from 'src/app/interfaces/movie';


export enum controlKeys {
  title = 'title',
  overview = 'overview',
  poster = 'poster',
  vote_average = 'vote_average',
  vote_count = 'vote_count',
  release_date = 'release_date'
}

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  submitted: boolean = false;
  movieForm: FormGroup;
  isLoading: boolean = false;
  imagePath: any
  viewImage: boolean = false;
  showRequiredImg: boolean = false;
  @Output() addToLis: EventEmitter<Movie> = new EventEmitter();
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  numRegex = /^[.\d]+$/;


  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.movieForm = this.fb.group({
      [controlKeys.title]: ['', [Validators.required, Validators.maxLength(50)]],
      [controlKeys.overview]: ['', [Validators.required, Validators.maxLength(400)]],
      [controlKeys.vote_average]: ['', [Validators.required, Validators.max(10), Validators.pattern(this.numRegex)]],
      [controlKeys.vote_count]: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      [controlKeys.release_date]: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }



  fileChange(file: any, isDrag: boolean) {
    if (isDrag) {
      this.uploadImage(file)
    } else {
      this.uploadImage(file.target.files)
    }
  }



  uploadImage(files: any) {
    // const files = file.target.files;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log('Only images are supported.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error uploading file',
        detail: 'Only images are supported.',
      });
      return;
    } else {
      const reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      this.showRequiredImg = false
      reader.onload = (_event) => {
        this.imagePath = reader.result;
        this.viewImage = true;
      };
    }
  }

  addMovie() {
    this.submitted = true;
    if (this.movieForm.invalid) {
      this.isLoading = false;
      return;
    } else {
      if (typeof this.imagePath === 'undefined') {
        this.showRequiredImg = true
      } else {
        this.isLoading = true
        this.showRequiredImg = false
        setTimeout(() => {
          let movieObject = {
            ...this.movieForm.value,
            posterImage: this.imagePath
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'this Movie is added successfully',
          });
          this.isLoading = false
          this.addToLis.emit(movieObject)
          this.cancel()
        }, 1000)
      }
    }
  }

  cancel() {
    this.movieForm.reset()
    this.submitted = false;
    this.closeDialog.emit(false)
    this.viewImage = false
  }

}
