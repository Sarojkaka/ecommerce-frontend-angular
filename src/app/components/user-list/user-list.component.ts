import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        // Initialize isChecked and checkboxLabel for each user
        this.users = data.map(user => ({
          ...user,
          isChecked: false,
          checkboxLabel: 'Active'
        }));
        console.log('Users fetched successfully:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Update label dynamically for each user
  onCheckboxChange(user: any): void {
 user.checkboxLabel = user.isChecked ? 'Deactivate' : 'Active';
  }
}