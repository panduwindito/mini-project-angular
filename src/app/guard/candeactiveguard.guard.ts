import { CanDeactivate} from '@angular/router';
import {Injectable} from "@angular/core";

export interface CanComponentDeactive{
  canDeactivate: () => boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CandeactiveguardGuard implements CanDeactivate<CanComponentDeactive> {
    canDeactivate(component: CanComponentDeactive): boolean {
      return component.canDeactivate ? component.canDeactivate() : true;
    }

}
