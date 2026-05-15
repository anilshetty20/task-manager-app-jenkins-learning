pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {

        BACKEND_IMAGE = 'anil1576/task-manager-backend'
        FRONTEND_IMAGE = 'anil1576/task-manager-frontend'

        BACKEND_CONTAINER = 'backend-container'
        FRONTEND_CONTAINER = 'frontend-container'
    }

    stages {

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE:latest .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE:latest .'
                }
            }
        }

        stage('Push Docker Images') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh 'docker push $BACKEND_IMAGE:latest'

                    sh 'docker push $FRONTEND_IMAGE:latest'
                }
            }
        }

        stage('Deploy Backend Container') {
            steps {

                sh '''
                docker stop $BACKEND_CONTAINER || true
                docker rm $BACKEND_CONTAINER || true

                docker pull $BACKEND_IMAGE:latest

                docker run -d \
                --name $BACKEND_CONTAINER \
                -p 5000:5000 \
                $BACKEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy Frontend Container') {
            steps {

                sh '''
                docker stop $FRONTEND_CONTAINER || true
                docker rm $FRONTEND_CONTAINER || true

                docker pull $FRONTEND_IMAGE:latest

                docker run -d \
                --name $FRONTEND_CONTAINER \
                -p 3000:80 \
                $FRONTEND_IMAGE:latest
                '''
            }
        }

    }

    post {

        success {
            echo 'Full Stack CI/CD Pipeline Executed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}