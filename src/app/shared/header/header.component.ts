import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { MenuOption } from 'src/app/shared/models/Option.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    './toggle-menu.css',
    './menu.css'
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('toggle__menu') togggleMenu?: ElementRef<HTMLElement>
  @ViewChild('header__menu') menu?: ElementRef<HTMLElement>
  readonly MENU_OPTIONS = [
    new MenuOption('home', 'Home'),
    new MenuOption('local', 'Local'),
    new MenuOption('cloud', 'Cloud')
  ]

  userName: string = ''
  isLognin = false

  ngOnInit (): void {
    this.authService.validToken.subscribe()
    this.authService.user.subscribe(user => {
      this.isLognin = (user.uid !== '')
      this.userName = user.name
    })
  }

  constructor (
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  logout (): void {
    void this.router.navigateByUrl('/auth')
    this.authService.logout()
  }

  toggleMenu (): void {
    this.togggleMenu?.nativeElement.classList.toggle('toggle__menu--active')

    console.log(this.togggleMenu?.nativeElement.childNodes)
    console.log(this.togggleMenu?.nativeElement.children.item(1))

    this.togggleMenu?.nativeElement.children.item(0)?.classList.toggle('toggle__line--active')
    this.togggleMenu?.nativeElement.children.item(1)?.classList.toggle('toggle__line--active')
    this.togggleMenu?.nativeElement.children.item(2)?.classList.toggle('toggle__line--active')
    // Menu
    this.menu?.nativeElement.classList.toggle('header__menu--open')
  }
}
