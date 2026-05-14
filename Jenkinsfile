pipeline {

    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Repository cloned automatically by Jenkins'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

    }

    post {

        success {
            echo 'Pipeline executed successfully'
        }

        failure {
            echo 'Pipeline failed'
        }
    }
}