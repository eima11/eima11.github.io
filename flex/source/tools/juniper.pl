my @m = (
 # brand family
 ['#0D4F5C','#2B4642'], ['#093A44','#1F3431'], ['#0F5A68','#35524D'], ['#0B4552','#243B37'], ['#DCEAEB','#E3E9E7'],
 ['#1E8A87','#4F7770'], ['#2FB3A3','#7FA59D'], ['rgba(9,58,68,','rgba(31,52,49,'], ['rgba(13,79,92,','rgba(43,70,66,'],
 # dark-mode brand
 ['#13707F','#4A6E68'], ['#0F5D6A','#3E5E59'], ['#7FCFC4','#A9CBC3'], ['#123239','#1D2E2B'], ['rgba(127,207,196,','rgba(169,203,195,'],
 ['#1A2C31,#12343B','#1A2725,#1D2E2B'],
 # neutrals: warmer ink, warmer dark grounds
 ['#0C1C24','#15201E'], ['#2F3F46','#34413E'], ['#647177','#66726F'],
 ['--cream:#0B1417; --sand:#101C20; --sand-2:#17262B; --white:#142226;','--cream:#0E1413; --sand:#131B19; --sand-2:#1A2522; --white:#17211F;'],
 ['--line:#22343A; --line-2:#2F454C;','--line:#26332F; --line-2:#33433E;'], ['--on-ink:#0B1417;','--on-ink:#0E1413;'],
 ['rgba(26,44,50,.72), rgba(14,26,30,.55)','rgba(28,40,37,.72), rgba(16,24,22,.55)'], ['rgba(14,26,30,','rgba(16,24,22,'], ['rgba(11,20,23,','rgba(14,20,19,'], ['rgba(16,28,32,','rgba(20,28,26,'],
 ['#2A3D43','#2C3B37'], ['#3A4F55','#3D4C48'],
 ['rgba(22,44,52,.58), rgba(12,28,36,.40)','rgba(24,36,33,.58), rgba(14,22,20,.40)'], ['rgba(12,28,36,','rgba(14,22,20,'], ['rgba(9,30,36,','rgba(14,24,22,'],
 ['petrol brand (Flex green x Base360 blue)','deep juniper brand (a quieter take on Flex green)'],
);
local $/; my $s=<STDIN>; my %c;
for my $p (@m){ my ($a,$b)=@$p; my $n=()= $s=~/\Q$a\E/gi; $s=~s/\Q$a\E/$b/gi; $c{$a}=$n; }
print $s; print STDERR join("\n", map {sprintf "%-48s %d", $_, $c{$_}} map {$_->[0]} @m), "\n";
