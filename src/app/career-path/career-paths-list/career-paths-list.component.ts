import { Component, OnInit } from '@angular/core';
import { CareerPathService } from '../career-path.service';
import { CareerPath } from '../create-career-path/career-path.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-career-paths-list',
  standalone: false,
  templateUrl: './career-paths-list.component.html',
  styleUrls: ['./career-paths-list.component.css']
})
export class CareerPathsListComponent implements OnInit {
  existingCareerPaths: CareerPath[] = [];
  isLightboxOpen: boolean = false;
  safeCertificateUrl: SafeResourceUrl | null = null;
  selectedCareerPathId: number | null = null;
  isLoading = true;

  constructor(
    private careerPathService: CareerPathService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadCareerPaths();
  }

  loadCareerPaths(): void {
    this.careerPathService.loadEmployeeCareerPaths().subscribe({
      next: (careerPaths) => {this.existingCareerPaths = careerPaths
        console.log(this.existingCareerPaths);
        this.isLoading = false;
      },
      error: (err) => console.error('Failed to load career paths:', err),
    });
  }

  updateStep(stepId: any, done: boolean): void {
    this.careerPathService.updateStepStatus(done, stepId).subscribe({
      next: (res) => {
        console.log('Step status updated successfully:', res);
        this.loadCareerPaths();
        const careerPath = this.existingCareerPaths.find((path) =>
          path.steps.some((step) => step.id === stepId)
        );
        if (careerPath && careerPath.steps.every((step) => step.done)) {
          this.showCompletionConfirmation(careerPath.id);
        }
        this.isLoading = false;
      },
      error: (err) => console.error('Failed to update step status:', err),
    });
  }

  showCompletionConfirmation(careerPathId: any): void {
    const confirmed = confirm(
      'You have completed all steps. Do you want to finish this career path and generate a certification?'
    );
    if (confirmed) {
      this.careerPathService.completeCareerPath(careerPathId).subscribe({
        next: (certification) => {
          console.log('Career path completed and certification generated:', certification);
          alert('Career path completed successfully! Your certification is ready.');
          this.loadCareerPaths();
          this.isLoading = false;
        },
        error: (err) => console.error('Failed to complete career path:', err),
      });
    }
  }

  viewCertificate(careerPathId: any): void {
    this.careerPathService.getCareerPathCertification(careerPathId).subscribe({
      next: (certification) => {
        console.log(certification);
        
        const certificateUrl = `${certification.certificateUrl}`;
        console.log(certificateUrl);
        
        this.safeCertificateUrl = this.sanitizer.bypassSecurityTrustResourceUrl(certificateUrl);
        this.selectedCareerPathId = careerPathId;
        this.isLightboxOpen = true;
      },
      error: (err) => console.error('Failed to fetch certificate URL:', err),
    });
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.safeCertificateUrl = null;
    this.selectedCareerPathId = null;
  }

  getCompletedStepsCount(path: any): number {
    return path.steps.filter((step: any) => step.done).length;
  }
}
