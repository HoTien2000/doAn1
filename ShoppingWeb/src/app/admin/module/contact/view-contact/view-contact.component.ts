import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  contact:Contact | null = null;

  constructor(
    protected contactService: ContactService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById(this.route.snapshot.params['id']);
  }

  findById(id:any): void {
    this.contactService.findById(id).subscribe(
      (res: HttpResponse<Contact>) => {
        this.contact = res.body;
      }
    )
  }

  onBack(): void {
    window.history.back();
  }


}
