import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @ViewChild('fform') commentFormDirective;

    commentForm: FormGroup;
    newComment: any;
    errMess: string;

    formErrors = {
        'author': '',
        'rating': '',
        'comment': ''
    };

    validationMessages = {
        'author': {
            'required': 'Author Name is required.',
            'minlength': 'Author Name must be at least 2 characters long.'// ,
            // 'maxlength': 'Name cannot be more than 25 characters long.'
        },
        'comment': {
            'required': 'Comment is required.',
            'minlength': 'Comment must be at least 2 characters long.',
        }
    };

    dish: Dish;
    dishcopy = null;
    dishIds: number[];
    prev: number;
    next: number;

    constructor(private dishservice: DishService, private route: ActivatedRoute,
        private location: Location, private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL) {
        this.createForm();
    }

    ngOnInit() {
        this.dishservice.getDishIds().subscribe(dishIds =>
            this.dishIds = dishIds,
            errMess => this.errMess = <any>errMess.message);

            this.route.params.pipe(
            switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
            .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
                errmess => { this.dish = null; this.errMess = <any>errmess; });
    }

    setPrevNext(dishId: number) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) %
            this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) %
            this.dishIds.length];
    }

    goBack(): void {
        this.location.back();
    }

    createForm(): void {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]], // , Validators.maxLength(25)]],
            rating: ['5'],
            comment: ['', Validators.minLength(2)]
        });

        this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }

        const form = this.commentForm;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    onSubmit() {
        this.newComment = this.commentForm.value;
        this.newComment.date = new Date().toISOString();
        console.log(this.newComment);
        this.dishcopy.comments.push(this.newComment);
        this.dishcopy.save()
            .subscribe(dish => this.dish = dish);

        this.commentFormDirective.resetForm();

        this.commentForm.reset({
            author: '',
            rating: '5',
            comment: ''
        });

    }

}
