local $/; open my $v,'<',$ARGV[0]; my $vars=<$v>; open my $r,'<',$ARGV[1]; my $rules=<$r>;
my @rules = grep {/\S/} split /\n/, $rules;
my $sys = join "\n", map { "  :root:not([data-theme=\"light\"]) $_" } @rules;
my $tog = join "\n", map { ":root[data-theme=\"dark\"] $_" } @rules;
(my $vi=$vars)=~s/^/    /mg; (my $vt=$vars)=~s/^/  /mg;
print "/* ===== Dark theme ===== */\n\@media (prefers-color-scheme: dark){\n  :root:not([data-theme=\"light\"]){\n$vi  }\n$sys\n}\n:root[data-theme=\"dark\"]{\n$vt}\n$tog\n";
