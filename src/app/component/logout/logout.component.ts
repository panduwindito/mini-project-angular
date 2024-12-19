import { Component } from '@angular/core';
import {CanComponentDeactive} from "../../guard/candeactiveguard.guard";

@Component({
  selector: 'app-logout',
  standalone: false,
  template: "<p>Logout</p>"
})
export class LogoutComponent implements CanComponentDeactive {
  canDeactivate(): boolean{
    return confirm("Yakin Mau meninggalkan Halaman?")
  };

}
