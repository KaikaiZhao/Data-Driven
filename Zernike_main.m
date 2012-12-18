% -------------------------------------------------------------------------
% Copyright C 2012 Amir Tahmasbi
% The University of Texas at Dallas
% a.tahmasbi@utdallas.edu
% http://www.utdallas.edu/~a.tahmasbi/research.html
%
% -------------------------------------------------------------------------
% Licence Agreement: You are free to use this code in your scientific
%                    research but you should cite the following papers:
%
% [1] - A. Tahmasbi, F. Saki, S. B. Shokouhi, 
%      	Classification of Benign and Malignant Masses Based on Zernike Moments, 
% 	J. Computers in Biology and Medicine, vol. 41, no. 8, pp. 726-735, 2011.
%
% [2] - A. Tahmasbi, F. Saki, H. Aghapanah, S. B. Shokouhi,
%	A Novel Breast Mass Diagnosis System based on Zernike Moments as Shape and Density Descriptors,
%	in Proc. IEEE, 18th Iranian Conf. on Biomedical Engineering (ICBME'2011), 
%	Tehran, Iran, 2011, pp. 100-104.
%
% -------------------------------------------------------------------------
%%
% A demo of how to use the Zernike moment function. 
%
% Example: 
%   1- calculate the Zernike moment (n,m) for an oval shape,
%   2- rotate the oval shape around its centeroid,
%   3- calcul ate the Zernike moment (n,m) again,
%   4- the amplitude of the moment (A) should be the same for both images
%   5- the phase (Phi) should be equal to the angle of rotation
% -------------------------------------------------------------------------

clc;

n = 5; m = 5;           % Define the order and the iteration of the moment

disp('------------------------------------------------');
disp(['Calculating Zernike moments ..., n = ' num2str(n) ', m = ' num2str(m)]);

p = rgb2gray(imread('Oval_H.png'));
figure(1);subplot(1,3,1);imshow(p);
title('Horizantal oval');
p = logical(not(p));
N = size(p,1);
tic
[ZOH AOH PhiOH] = Zernikmoment(p,n,m);              % Call Zernikemoment fuction
Elapsed_time = toc;
xlabel({['A = ' num2str(AOH)]; ['\phi = ' num2str(PhiOH)]});

p = rgb2gray(imread('Oval_V.png'));
figure(1);subplot(1,3,2);imshow(p);
title('Vertical oval');
p = logical(not(p));

[ZOV AOV PhiOV] = Zernikmoment(p,n,m);              % Call Zernikemoment fuction
xlabel({['A = ' num2str(AOV)]; ['\phi = ' num2str(PhiOV)]});

p = rgb2gray(imread('Rectangular_H.png'));
figure(1);subplot(1,3,3);imshow(p);
title('Vertical rectangular');
p = logical(not(p));

[ZRH ARH PhiRH] = Zernikmoment(p,n,m);              % Call Zernikemoment fuction
xlabel({['A = ' num2str(ARH)]; ['\phi = ' num2str(PhiRH)]});

disp('Calculation is complete.');
disp(['The elapsed time per image is ' num2str(Elapsed_time) ' seconds']);


