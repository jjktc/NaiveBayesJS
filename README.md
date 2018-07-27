# NaiveBayesJS
A JavaScript Naive Bayes image classifier

Based off of my C++ Naive Bayes image classifier. Uses a subset of the MNIST data set to classify handwriting numbers 0-9.

## Normal
Normal mode simply runs each image in the test set one by one and spits out the statistics as it goes as well as the current specimen.

## Draw
Lets the user draw a number and then it tries to classify the number, fickle due to center of mass vs boundary centering and the fact the MNIST data set has bad handwriting. For best results, use handwriting as similar as possible to the MNIST set.