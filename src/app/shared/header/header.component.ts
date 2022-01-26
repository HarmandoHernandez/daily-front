import { Component, OnInit } from '@angular/core'
import { MenuOption } from './../models/MenuOption'

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

  ngOnInit (): void {
    this.deployMenu()
  }

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

  deployMenu = () => {
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
  }
}
