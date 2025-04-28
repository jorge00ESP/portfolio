import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit{

  isProjectError: boolean = true;
  projects: Project[] = [];

  constructor(private projectService: ProjectService){}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error(err);
        this.isProjectError = false;
        this.projects.push({
          title: "Error",
          description: "No hay datos que mostrar",
          isUrlButton: false,
          urlGitHub: "",
          urlWebSite: ""
        })
      }
    })
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }
}
