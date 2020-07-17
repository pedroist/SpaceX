import { Pipe, PipeTransform } from '@angular/core';
import { ILaunch } from '../models/ILaunch';

@Pipe({
  name: 'showOnlySuccess'
})
export class ShowOnlySuccessPipe implements PipeTransform {

  transform(launches: ILaunch[], showOnlySuccess: boolean, showOnlySuccessActive: boolean): ILaunch[] {
    debugger;
    if (!showOnlySuccessActive) {
      return launches;
    }
    return launches.filter(launch => launch.success === showOnlySuccess);
  }

}
