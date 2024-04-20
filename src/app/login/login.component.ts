import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorResponse: string = '';
  IsCompanyLogin: boolean = false
  DirectSite: string = 'ltr';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    if (this.route.snapshot.queryParams['type'] === 'company') {
      this.IsCompanyLogin = true
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem("LANGUAGE") === 'ar')
      this.DirectSite = "rtl";
  }

  onSubmit(form: any) {

    this.authService.loginAdmin(form.value).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          text: `welcome ${response.user.username} to start your journey with Shaglni`
        }).then(() => {
          localStorage.setItem("Token", response.accessToken);
          localStorage.setItem("_id", response.user._id);
          this.router.navigateByUrl('/home/fs')
        });

      },
      error => {
        // Handle login error

        this.errorResponse = error.error.message
      }
    );

  }
}
