t = 0:2*pi/5:(2*pi-2*pi/5);
vert = [cos(t'),sin(t'),zeros(5,1)];
t = t'+pi/5;
a = 2*sin(pi/5);
vert=[vert;cos(t),sin(t),a*sqrt(3)*ones(5,1)/2];
h = sqrt(0.75*a^2-cos(pi/5)^2);
vert = [0 0 -h;vert;0 0 a*sqrt(3)/2+h];
fac = [1 2 3
       1 3 4
       1 4 5
       1 5 6
       1 6 2
       2 3 7
       2 6 11
       2 7 11
       3 7 8
       3 4 8
       4 8 9
       4 5 9
       5 9 10
       5 6 10
       6 10 11
       7 8 12
       8 9 12
       9 10 12
       10 11 12
       7 11 12];
h = patch('faces',fac,'vertices',vert,'FaceColor','r');
view(3);    %�����ӽ�
%set(h,'FaceAlpha',0.5);    %������12����͸����
light('Posi',[100 100 100]);
lightangle(30,30);     %������Դ�����ù�Դ�ӽ�
lighting flat;    %���ù���ģʽ
material metal;    %������ķ�������
axis equal;    %������������ʾ��ʽ
%xlabel('X'); ylabel('Y'); zlabel('Z');    %Ϊ������ӱ�ǩ
axis off