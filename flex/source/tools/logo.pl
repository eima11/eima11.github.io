local $/; my ($F,$sym)=@ARGV; open my $h,'<',$F; my $s=<$h>; open my $y,'<',$sym; my $Y=<$y>; my $n=0;
my $logo='<svg class="logo" viewBox="0 0 2816 506" role="img" aria-label="The Flex Academy"><use href="#logo"/></svg>';
$n+=$s=~s#(<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>\n)#$1$Y#;
$n+=$s=~s#<a class="brand" href="\#top" aria-label="Flex Academy home"><img src="assets/the-flex.png" alt="the flex." width="107" height="26"><span class="div"></span><b>Academy</b></a>#<a class="brand" href="\#top" aria-label="The Flex Academy home">$logo</a>#;
$n+=$s=~s#<span class="brand"><img src="assets/the-flex.png" alt="the flex." width="91" height="22"><span class="div"></span><b>Academy</b></span>#<span class="brand">$logo</span>#;
$n+=$s=~s#<span class="brand"><img src="assets/the-flex.png" alt="the flex." width="107" height="26"><span class="div"></span><b>Academy</b></span>#<span class="brand brand-foot">$logo</span>#;
$n+=$s=~s#</style>#/* ===== Logo ===== */\n.brand .logo{display:block; height:28px; width:156px; color:var(--brand-ink); transition:color .3s}\n.brand-foot .logo{height:30px; width:167px}\n\@media (max-width:640px){ .brand .logo{height:24px; width:134px} }\n</style>#;
open my $o,'>',$F; print $o $s; print "replacements: $n / 5\n";
