import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { MenuOption } from 'src/app/shared/models/Option.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    './deploy-menu.css']
})
export class HeaderComponent implements OnInit {
  readonly MENU_OPTIONS = [
    new MenuOption('home', 'Home'),
    new MenuOption('local', 'Local'),
    new MenuOption('cloud', 'Cloud')
  ]

  userName: string = ''
  isLognin = false

  ngOnInit (): void {
    // this.deployMenu()
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

  // II TODO: Manejo de menu en moviles
  /* const DeployMenu = () => {
    const deploy = document.getElementById('header__deploy-menu')
    const bars = document.querySelectorAll('#header__deploy-menu span')
    const menu = document.getElementById('header__menu')

    deploy.addEventListener('click', () => {
      deploy.classList.toggle('header__deploy-menu--active')
      bars.forEach((bar) => {
        bar.classList.toggle('header__bar--active')
      })
      // Menu
      menu.classList.toggle('header__menu--open')
    })
  }

  DeployMenu() */

  /* deployMenu = () => {
    const deploy = document.getElementById('header__deploy-menu')
    const bars = document.querySelectorAll('#header__deploy-menu span')
    const menu = document.getElementById('header__menu')

    deploy?.addEventListener('click', () => {
      deploy.classList.toggle('header__deploy-menu--active')
      bars.forEach((bar) => {
        bar.classList.toggle('header__bar--active')
      })
      // Menu
      menu?.classList.toggle('header__menu--open')
    })
  } */
}
