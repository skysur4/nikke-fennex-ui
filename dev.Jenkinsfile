pipeline {

	agent {
		node {
			label 'kaniko-pod'
		}
	}

	environment {
		REPLACE_NAME = "front"
		IMAGE_NAME = "${REPLACE_NAME}:d"
		IMAGE_VERSION = "0.0.${BUILD_NUMBER}"
		IMAGE_PATH = "analytics"

		ARGOCD_GIT_URL = "gitlab.bluebears.co.kr/bluebearsdev/argocd.git"
		ARGOCD_GIT_BRANCH = "development"
		ARGOCD_DEPLOY_YAML_FILE = "analyticsdev/front/deployment.yaml"
	}

        stages {
            stage('Build React App') {
                steps {
                    container('kaniko') {
                            nodejs(nodeJSInstallationName: 'nodejs', configId: 'nexus-npm-config') {
                                sh 'npm config ls'
                                sh 'npm install --legacy-peer-deps'
                                sh 'npm run build:dev'
                            }
                    }
            }
                post {
                    failure {
                        echo 'Building React app failed...'
                        updateGitlabCommitStatus name: 'build', state: 'failed'
                    }
                    success {
                        echo 'Building React app succeeded...'
                        updateGitlabCommitStatus name: 'build', state: 'success'
                    }
                }
		}

        stage('Build & Push Docker Image') {
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor --context `pwd` \
                                         --dockerfile `pwd`/Dockerfile \
                                         --destination docker.bluebears.co.kr/${IMAGE_PATH}/${IMAGE_NAME}${IMAGE_VERSION}
                    """
                }
            }

			post {
				failure {
					echo 'Building image & push failed...'
					updateGitlabCommitStatus name: 'image', state: 'failed'
				}
				success {
					echo 'Building image & push succeeded...'
					updateGitlabCommitStatus name: 'image', state: 'success'
				}
        	}
        }

		stage('Update ArgoCD Manifest') {
			steps {
				sh "mkdir argocd"

				dir("argocd"){
					git credentialsId: "bluebears-gitlab", url: "https://${ARGOCD_GIT_URL}", branch: "${ARGOCD_GIT_BRANCH}"

					sh "git config user.email 'bluebears@bluebears.co.kr'"
					sh "git config user.name 'bluebears'"
					sh "sed -i 's/${REPLACE_NAME}:.*\$/${IMAGE_NAME}${IMAGE_VERSION}/g' ${ARGOCD_DEPLOY_YAML_FILE}"
					sh "git add ${ARGOCD_DEPLOY_YAML_FILE}"
					sh "git commit -m '[UPDATE] docker image info -> ${IMAGE_NAME}${IMAGE_VERSION}'"

					withCredentials([usernamePassword(credentialsId: "bluebears-gitlab", passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
						sh("git push https://${GIT_USERNAME}:${GIT_PASSWORD}@${ARGOCD_GIT_URL}")
					}
				}
			}

			post {
				failure {
					echo 'Updating ArgoCD manifest failed...'
					updateGitlabCommitStatus name: 'deploy', state: 'failed'
				}
				success {
					echo 'Updating ArgoCD manifest succeeded...'
					updateGitlabCommitStatus name: 'deploy', state: 'success'
				}
		        always {
		            cleanWs(deleteDirs: true, disableDeferredWipeout: true)
		        }
        	}
		}
	}
}
