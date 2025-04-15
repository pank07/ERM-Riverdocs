import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDetails'
})
export class UserDetailsPipe implements PipeTransform {

  transform(userNames: string): { initials: string; fullName: string }[] {
    if (!userNames) {
      return [];
    }

    return userNames.split(',').map((name) => {
      const trimmedName = name.trim();
      const initials = trimmedName
        .split(' ')
        .filter(Boolean) // Remove extra spaces
        .map((word) => word[0].toUpperCase())
        .join('');
      return { initials, fullName: trimmedName };
    });
  }
  

}
