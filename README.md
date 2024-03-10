# My test-website React App

This is a simple guide to set up and run the React app using Docker.

## Prerequisites

Make sure you have the following installed on your machine:
- Docker

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/madushiranasooriya/weather-test-website.git
    ```

2. Change into the project directory:

    ```bash
    cd test-website
    ```

3. Build the Docker image:

    ```bash
    docker build -t docker-test-website .
    ```

4. Run the Docker container:

    ```bash
    docker run -p 3000:3000 -d docker-test-website
    ```

Now, you should be able to access your React app at [http://localhost:3000/](http://localhost:3000/).

## Additional Information

- To stop the running Docker container:

    ```bash
    docker stop <container_id>
    ```

- To remove Docker images:

    ```bash
    docker rmi docker-test-website
    ```

- For HTTPS support, update the Dockerfile to include SSL configurations.

## Contributing

Feel free to contribute by submitting issues or pull requests.

Happy coding!