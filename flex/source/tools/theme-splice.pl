local $/; my ($F,$css,$js)=@ARGV; open my $h,'<',$F; my $s=<$h>; open my $c,'<',$css; my $C=<$c>; open my $j,'<',$js; my $J=<$j>; my $n=0;
$n+=$s=~s#</style>#$C</style>#;
$n+=$s=~s#(<title>Flex Academy Brand</title>)#$1\n<script>try{var t=localStorage.getItem('fa-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>#;
$n+=$s=~s#(    <div class="hdr-cta">\n)#$1      <button class="theme-btn" type="button" id="themeBtn" aria-label="Switch to dark mode" aria-pressed="false"><svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg><svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/></svg></button>\n#;
$n+=$s=~s#(\n  setPath\(store\.get\('fa-path'\))#\n$J$1#;
open my $o,'>',$F; print $o $s; print "splices: $n / 4\n";
