pipeline {
  agent { label 'dind' }

  environment {
    REGISTRY = 'acrclock105915912.azurecr.io'
    IMAGE    = 'clock-frontend'
    TAG      = 'dev'
  }

  stages {

    stage('Wait for Docker') {
      steps {
        container('dind') {
          sh '''
            echo "Waiting for Docker daemon..."
            until docker info >/dev/null 2>&1; do
              sleep 2
            done
            echo "Docker is ready"
          '''
        }
      }
    }

    stage('Build Image') {
      steps {
        container('dind') {
          sh '''
            echo "Building frontend image"
            docker build -t $REGISTRY/$IMAGE:$TAG .
          '''
        }
      }
    }

    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'acr-creds',
          usernameVariable: 'ACR_USER',
          passwordVariable: 'ACR_PASS'
        )]) {
          container('dind') {
            sh '''
              echo "Logging in to ACR"
              echo $ACR_PASS | docker login $REGISTRY -u $ACR_USER --password-stdin

              echo "Pushing image to ACR"
              docker push $REGISTRY/$IMAGE:$TAG
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Frontend image built and pushed successfully"
    }
    failure {
      echo "❌ Frontend pipeline failed"
    }
  }
}