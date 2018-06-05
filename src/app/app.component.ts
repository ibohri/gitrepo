import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const CurrentUserForProfile = gql`
  query CurrentUserForProfile{ 
user(login:"ibohri"){
  repositories(first:30) {
    nodes{
      dependencyGraphManifests(first:30){
nodes{
  dependencies(first:30){
nodes{
  requirements 
  packageName 
  packageManager 
  repository {
    name
  }
}
  }
}
      } 
    }
  }
}

  }
`;

const Vulner = gql`
  query Vulner{ 
user(login:"ibohri"){
  repositories(first:30) {
    nodes{
  vulnerabilityAlerts(first:30) {
nodes{
  packageName 
}}}
  }
}

  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  /**
   *
   */
  constructor(private apollo: Apollo) {
    console.log("Hi")
    this.apollo.watchQuery<any>({
      query: CurrentUserForProfile
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data)
      })
  }
}
