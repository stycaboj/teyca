import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  imports: [TranslatePipe],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {

}
